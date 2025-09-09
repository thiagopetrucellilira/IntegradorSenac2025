package com.donation.api.config;

import com.donation.api.entity.User;
import com.donation.api.entity.Donation;
import com.donation.api.entity.Match;
import com.donation.api.entity.enums.UserRole;
import com.donation.api.repository.UserRepository;
import com.donation.api.repository.DonationRepository;
import com.donation.api.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DonationRepository donationRepository;
    
    @Autowired
    private MatchRepository matchRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Verificar se já existem dados no banco
        if (userRepository.count() > 0) {
            System.out.println("=== Dados já existem no banco, pulando inicialização ===");
            return;
        }
        
        System.out.println("=== Iniciando população do banco de dados ===");
        
        // Criar usuários
        createUsers();
        
        // Criar doações
        createDonations();
        
        // Criar matches
        createMatches();
        
        System.out.println("=== População do banco concluída com sucesso ===");
    }
    
    private void createUsers() {
        System.out.println("Criando usuários...");
        
        // Senha padrão para todos os usuários
        String defaultPassword = passwordEncoder.encode("123456");
        
        // DOADORES
        User joao = new User();
        joao.setName("João Silva Santos");
        joao.setEmail("joao.silva@email.com");
        joao.setPassword(defaultPassword);
        joao.setPhone("(11) 99876-5432");
        joao.setAddress("Rua das Flores, 123");
        joao.setCity("São Paulo");
        joao.setState("SP");
        joao.setZipCode("01234-567");
        joao.setBio("Empresário que acredita na solidariedade. Gosto de ajudar pessoas em situação de vulnerabilidade através de doações de roupas e alimentos.");
        joao.setRole(UserRole.DONOR);
        joao.setEnabled(true);
        joao.setCreatedAt(LocalDateTime.now());
        userRepository.save(joao);
        
        User maria = new User();
        maria.setName("Maria Fernanda Costa");
        maria.setEmail("maria.costa@email.com");
        maria.setPassword(defaultPassword);
        maria.setPhone("(21) 98765-4321");
        maria.setAddress("Av. Copacabana, 456");
        maria.setCity("Rio de Janeiro");
        maria.setState("RJ");
        maria.setZipCode("22070-000");
        maria.setBio("Professora aposentada que adora ajudar famílias carentes. Sempre tenho livros, roupas infantis e brinquedos para doar.");
        maria.setRole(UserRole.DONOR);
        maria.setEnabled(true);
        maria.setCreatedAt(LocalDateTime.now());
        userRepository.save(maria);
        
        User carlos = new User();
        carlos.setName("Carlos Eduardo Oliveira");
        carlos.setEmail("carlos.oliveira@email.com");
        carlos.setPassword(defaultPassword);
        carlos.setPhone("(31) 97654-3210");
        carlos.setAddress("Rua do Comércio, 789");
        carlos.setCity("Belo Horizonte");
        carlos.setState("MG");
        carlos.setZipCode("30120-000");
        carlos.setBio("Comerciante local. Sempre que renovo o estoque, doo produtos em bom estado para quem precisa.");
        carlos.setRole(UserRole.DONOR);
        carlos.setEnabled(true);
        carlos.setCreatedAt(LocalDateTime.now());
        userRepository.save(carlos);
        
        User ana = new User();
        ana.setName("Ana Paula Ribeiro");
        ana.setEmail("ana.ribeiro@email.com");
        ana.setPassword(defaultPassword);
        ana.setPhone("(47) 96543-2109");
        ana.setAddress("Rua Santa Catarina, 321");
        ana.setCity("Blumenau");
        ana.setState("SC");
        ana.setZipCode("89010-000");
        ana.setBio("Médica voluntária. Participo de campanhas sociais e sempre doo roupas, calçados e itens de higiene.");
        ana.setRole(UserRole.DONOR);
        ana.setEnabled(true);
        ana.setCreatedAt(LocalDateTime.now());
        userRepository.save(ana);
        
        User roberto = new User();
        roberto.setName("Roberto Mendes Silva");
        roberto.setEmail("roberto.mendes@email.com");
        roberto.setPassword(defaultPassword);
        roberto.setPhone("(85) 95432-1098");
        roberto.setAddress("Av. Beira Mar, 654");
        roberto.setCity("Fortaleza");
        roberto.setState("CE");
        roberto.setZipCode("60165-000");
        roberto.setBio("Engenheiro aposentado. Gosto de ajudar organizações sociais e famílias através de doações de móveis e eletrodomésticos.");
        roberto.setRole(UserRole.DONOR);
        roberto.setEnabled(true);
        roberto.setCreatedAt(LocalDateTime.now());
        userRepository.save(roberto);
        
        // SOLICITANTES
        User lucia = new User();
        lucia.setName("Lúcia Maria Santos");
        lucia.setEmail("lucia.santos@email.com");
        lucia.setPassword(defaultPassword);
        lucia.setPhone("(11) 94321-0987");
        lucia.setAddress("Rua da Esperança, 147");
        lucia.setCity("São Paulo");
        lucia.setState("SP");
        lucia.setZipCode("08100-000");
        lucia.setBio("Mãe solteira de dois filhos. Trabalho como diarista e preciso de ajuda com roupas infantis e alimentos básicos.");
        lucia.setRole(UserRole.REQUESTER);
        lucia.setEnabled(true);
        lucia.setCreatedAt(LocalDateTime.now());
        userRepository.save(lucia);
        
        User pedro = new User();
        pedro.setName("Pedro Henrique Alves");
        pedro.setEmail("pedro.alves@email.com");
        pedro.setPassword(defaultPassword);
        pedro.setPhone("(21) 93210-9876");
        pedro.setAddress("Rua Nova Esperança, 258");
        pedro.setCity("Rio de Janeiro");
        pedro.setState("RJ");
        pedro.setZipCode("21040-000");
        pedro.setBio("Estudante universitário em situação de vulnerabilidade. Preciso de livros, material escolar e às vezes alimentos.");
        pedro.setRole(UserRole.REQUESTER);
        pedro.setEnabled(true);
        pedro.setCreatedAt(LocalDateTime.now());
        userRepository.save(pedro);
        
        User sandra = new User();
        sandra.setName("Sandra Regina Lima");
        sandra.setEmail("sandra.lima@email.com");
        sandra.setPassword(defaultPassword);
        sandra.setPhone("(31) 92109-8765");
        sandra.setAddress("Rua do Progresso, 369");
        sandra.setCity("Belo Horizonte");
        sandra.setState("MG");
        sandra.setZipCode("31030-000");
        sandra.setBio("Cuidadora de idosos. Mãe de três filhos, preciso de roupas infantis e itens básicos para a casa.");
        sandra.setRole(UserRole.REQUESTER);
        sandra.setEnabled(true);
        sandra.setCreatedAt(LocalDateTime.now());
        userRepository.save(sandra);
        
        User jose = new User();
        jose.setName("José Carlos Ferreira");
        jose.setEmail("jose.ferreira@email.com");
        jose.setPassword(defaultPassword);
        jose.setPhone("(47) 91098-7654");
        jose.setAddress("Rua da Solidariedade, 741");
        jose.setCity("Blumenau");
        jose.setState("SC");
        jose.setZipCode("89020-000");
        jose.setBio("Desempregado há 6 meses. Pai de família procurando oportunidades e precisando de roupas para entrevistas de emprego.");
        jose.setRole(UserRole.REQUESTER);
        jose.setEnabled(true);
        jose.setCreatedAt(LocalDateTime.now());
        userRepository.save(jose);
        
        User francisca = new User();
        francisca.setName("Francisca Silva Sousa");
        francisca.setEmail("francisca.sousa@email.com");
        francisca.setPassword(defaultPassword);
        francisca.setPhone("(85) 90987-6543");
        francisca.setAddress("Rua do Futuro, 852");
        francisca.setCity("Fortaleza");
        francisca.setState("CE");
        francisca.setZipCode("60180-000");
        francisca.setBio("Avó cuidando de 4 netos. Preciso de roupas infantis, material escolar e alimentos não perecíveis.");
        francisca.setRole(UserRole.REQUESTER);
        francisca.setEnabled(true);
        francisca.setCreatedAt(LocalDateTime.now());
        userRepository.save(francisca);
        
        System.out.println("Usuários criados: " + userRepository.count());
    }
    
    private void createDonations() {
        System.out.println("Criando doações...");
        
        // Buscar usuários doadores
        List<User> donors = userRepository.findAll().stream()
            .filter(user -> user.getRole() == UserRole.DONOR)
            .toList();
        
        if (donors.isEmpty()) {
            System.out.println("Nenhum doador encontrado!");
            return;
        }
        
        // Doações do João (primeiro doador)
        User joao = donors.get(0);
        
        Donation donation1 = new Donation();
        donation1.setTitle("Roupas Masculinas Tamanho M e G");
        donation1.setDescription("Camisetas, calças jeans e camisas sociais em ótimo estado. Roupas de marca, bem conservadas, ideais para trabalho e uso casual.");
        donation1.setCategory("Roupas");
        donation1.setCondition("BOM");
        donation1.setQuantity(15);
        donation1.setLocation("Próximo ao Shopping Eldorado");
        donation1.setCity("São Paulo");
        donation1.setState("SP");
        donation1.setZipCode("01234-567");
        donation1.setStatus(Donation.DonationStatus.AVAILABLE);
        donation1.setPickupInstructions("Disponível para retirada de segunda a sexta, das 18h às 21h. Favor entrar em contato antes.");
        donation1.setExpiresAt(LocalDateTime.now().plusDays(30));
        donation1.setCreatedAt(LocalDateTime.now());
        donation1.setDonor(joao);
        donationRepository.save(donation1);
        
        Donation donation2 = new Donation();
        donation2.setTitle("Alimentos Não Perecíveis");
        donation2.setDescription("Cesta básica completa: arroz, feijão, óleo, macarrão, açúcar, sal, farinha de trigo, sardinha e molho de tomate.");
        donation2.setCategory("Alimentos");
        donation2.setCondition("NOVA");
        donation2.setQuantity(3);
        donation2.setLocation("Região Central da Cidade");
        donation2.setCity("São Paulo");
        donation2.setState("SP");
        donation2.setZipCode("01234-567");
        donation2.setStatus(Donation.DonationStatus.AVAILABLE);
        donation2.setPickupInstructions("Retirada combinada via WhatsApp. Posso entregar em pontos próximos ao metrô.");
        donation2.setExpiresAt(LocalDateTime.now().plusDays(15));
        donation2.setCreatedAt(LocalDateTime.now());
        donation2.setDonor(joao);
        donationRepository.save(donation2);
        
        // Doações da Maria (segundo doador)
        if (donors.size() > 1) {
            User maria = donors.get(1);
            
            Donation donation3 = new Donation();
            donation3.setTitle("Livros Didáticos Ensino Fundamental");
            donation3.setDescription("Livros de matemática, português, ciências e história do 6º ao 9º ano. Material em bom estado, poucos rabiscos.");
            donation3.setCategory("Educação");
            donation3.setCondition("BOM");
            donation3.setQuantity(25);
            donation3.setLocation("Copacabana - Próximo à praia");
            donation3.setCity("Rio de Janeiro");
            donation3.setState("RJ");
            donation3.setZipCode("22070-000");
            donation3.setStatus(Donation.DonationStatus.AVAILABLE);
            donation3.setPickupInstructions("Retirada preferencialmente aos finais de semana. Moro próximo à estação do metrô.");
            donation3.setExpiresAt(LocalDateTime.now().plusDays(45));
            donation3.setCreatedAt(LocalDateTime.now());
            donation3.setDonor(maria);
            donationRepository.save(donation3);
            
            Donation donation4 = new Donation();
            donation4.setTitle("Roupas Infantis 4 a 8 anos");
            donation4.setDescription("Vestidos, camisetas, shorts e calças para meninas. Algumas peças de marca, todas bem cuidadas.");
            donation4.setCategory("Roupas");
            donation4.setCondition("BOM");
            donation4.setQuantity(20);
            donation4.setLocation("Copacabana - Zona Sul");
            donation4.setCity("Rio de Janeiro");
            donation4.setState("RJ");
            donation4.setZipCode("22070-000");
            donation4.setStatus(Donation.DonationStatus.AVAILABLE);
            donation4.setPickupInstructions("Posso entregar em pontos de fácil acesso no Rio. Prefiro combinar por telefone.");
            donation4.setExpiresAt(LocalDateTime.now().plusDays(60));
            donation4.setCreatedAt(LocalDateTime.now());
            donation4.setDonor(maria);
            donationRepository.save(donation4);
        }
        
        // Mais doações dos outros doadores...
        if (donors.size() > 2) {
            User carlos = donors.get(2);
            
            Donation donation5 = new Donation();
            donation5.setTitle("Móveis para Casa");
            donation5.setDescription("Mesa de jantar com 4 cadeiras, estante pequena e rack para TV. Móveis usados mas em bom estado.");
            donation5.setCategory("Móveis");
            donation5.setCondition("BOM");
            donation5.setQuantity(1);
            donation5.setLocation("Centro Comercial - Região do Mercado Central");
            donation5.setCity("Belo Horizonte");
            donation5.setState("MG");
            donation5.setZipCode("30120-000");
            donation5.setStatus(Donation.DonationStatus.AVAILABLE);
            donation5.setPickupInstructions("Retirada com agendamento. Possuo caminhão para entrega em BH mediante combinação.");
            donation5.setExpiresAt(LocalDateTime.now().plusDays(20));
            donation5.setCreatedAt(LocalDateTime.now());
            donation5.setDonor(carlos);
            donationRepository.save(donation5);
        }
        
        System.out.println("Doações criadas: " + donationRepository.count());
    }
    
    private void createMatches() {
        System.out.println("Criando matches...");
        
        // Buscar algumas doações e solicitantes para criar matches
        List<Donation> donations = donationRepository.findAll();
        List<User> requesters = userRepository.findAll().stream()
            .filter(user -> user.getRole() == UserRole.REQUESTER)
            .toList();
        
        if (donations.isEmpty() || requesters.isEmpty()) {
            System.out.println("Não há doações ou solicitantes suficientes para criar matches");
            return;
        }
        
        // Criar alguns matches de exemplo
        if (donations.size() > 0 && requesters.size() > 0) {
            Match match1 = new Match();
            match1.setMessage("Olá! Preciso muito dessas roupas para meu irmão que está procurando emprego. Ele veste tamanho M. Posso buscar no horário que for melhor para você. Muito obrigada pela oportunidade!");
            match1.setStatus(Match.MatchStatus.PENDING);
            match1.setRequestedAt(LocalDateTime.now());
            match1.setCreatedAt(LocalDateTime.now());
            match1.setDonation(donations.get(0));
            match1.setRequester(requesters.get(0));
            matchRepository.save(match1);
        }
        
        if (donations.size() > 1 && requesters.size() > 1) {
            Match match2 = new Match();
            match2.setMessage("Oi! Sou estudante e trabalho com reforço escolar para crianças carentes. Esses livros seriam muito úteis. Posso buscar no final de semana. Desde já agradeço!");
            match2.setStatus(Match.MatchStatus.APPROVED);
            match2.setRequestedAt(LocalDateTime.now().minusDays(2));
            match2.setCreatedAt(LocalDateTime.now().minusDays(2));
            match2.setDonation(donations.get(1));
            match2.setRequester(requesters.get(1));
            matchRepository.save(match2);
        }
        
        System.out.println("Matches criados: " + matchRepository.count());
    }
}
