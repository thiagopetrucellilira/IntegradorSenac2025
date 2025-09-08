package com.donation.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
<<<<<<< HEAD

=======
    
    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    
>>>>>>> 311b0ea23c4883c7c2909488afbf178314305692
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.startsWith("/api/auth/register") ||
                path.startsWith("/api/auth/login") ||
                path.startsWith("/v3/api-docs") ||
                path.startsWith("/swagger-ui") ||
                path.startsWith("/swagger-ui.html") ||
                path.startsWith("/h2-console");
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Se o método shouldNotFilter() retornar 'true', este método será ignorado
        // (A lógica de bypass anterior foi removida daqui)

        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwtToken);
                logger.debug("Username extraído do token: {}", username);
            } catch (io.jsonwebtoken.security.SignatureException e) {
                logger.warn("Token JWT com assinatura inválida: {}", e.getMessage());
            } catch (io.jsonwebtoken.ExpiredJwtException e) {
                logger.warn("Token JWT expirado: {}", e.getMessage());
            } catch (io.jsonwebtoken.MalformedJwtException e) {
                logger.warn("Token JWT mal formado: {}", e.getMessage());
            } catch (Exception e) {
                logger.error("Erro ao processar token JWT: {}", e.getMessage());
            }
        } else {
            logger.debug("Token JWT não encontrado ou formato inválido");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            try {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                
                // Se token é válido, configura Spring Security para configurar manualmente a autenticação
                if (jwtUtil.validateToken(jwtToken, userDetails)) {
                    logger.debug("Token válido para usuário: {}", username);
                    
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken
                            .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    // Após definir a Authentication no contexto, especificamos que o usuário atual está autenticado.
                    // Assim ele passa as configurações de Security com sucesso.
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                } else {
                    logger.warn("Token inválido para usuário: {}", username);
                }
            } catch (Exception e) {
                logger.error("Erro ao validar usuário: {}", e.getMessage());

            }
        }
        
        chain.doFilter(request, response);
    }
}