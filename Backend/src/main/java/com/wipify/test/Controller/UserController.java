package com.wipify.test.Controller;

import com.wipify.test.model.Article;
import com.wipify.test.model.RoleEntity;
import com.wipify.test.model.UserEntity;
import com.wipify.test.repository.RoleJpaRepository;
import com.wipify.test.repository.UserRepository;
import com.wipify.test.services.filestorage.FileStorageService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

/**
 * Contrôleur pour les opérations liées aux utilisateurs.
 */
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleJpaRepository roleRepository;

    @Value("${serveur.url}")
    private String url;

    /**
     * Attribut permettant d'utiliser le système de log "slf4j" (API de
     * journalisation Java)
     * Pour plus d'informations sur slf4j ->
     * https://www.baeldung.com/slf4j-with-log4j2-logback
     */
    Logger logger = LoggerFactory.getLogger(FileStorageService.class);

    @Autowired
    private FileStorageService fileStorageService;


    /**
     * Crée un nouvel utilisateur.
     *
     * @param userEntity Le nouvel utilisateur à créer.
     * @param response   La réponse HTTP.
     * @return L'utilisateur créé.
     */
    @PostMapping(value = "/user", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin
    public UserEntity createUser(@RequestBody UserEntity users) {
        UserEntity existingUser = userRepository.findByEmail(users.getEmail());
        if (existingUser != null) {
            throw new RuntimeException("L'adresse e-mail est déjà utilisée.");
        }
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String passwordEncode = bCryptPasswordEncoder.encode(users.getPassword());
        users.setPassword(passwordEncode);
        RoleEntity userRole = roleRepository.findByName("ROLE_ADMIN");
        if (userRole == null) {
            throw new RuntimeException("Role introuvable");
        }
        users.getRoles().add(userRole);
        return userRepository.save(users);
    }

    /**
     * Confirme le compte d'un utilisateur.
     *
     * @param userId L'ID de l'utilisateur.
     * @param token  Le jeton de confirmation.
     * @return Une chaîne indiquant le statut de la confirmation.
     */
    @GetMapping("/confirmation")
    public ResponseEntity<String> confirmAccount(@RequestParam("userId") int userId, @RequestParam("token") String token) {
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            if (token.equals(user.getConfirmationToken())) {
                // Mettre à jour le champ is_verified à true
                user.setVerified(true);
                userRepository.save(user);
                return ResponseEntity.ok("Verification réussie");
            } else {
                return ResponseEntity.badRequest().body("Token invalide");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur introuvable");
        }
    }


    private String generateConfirmationToken() {
        return UUID.randomUUID().toString();
    }

    private String generateConfirmationLink(int userId, String token) {
        return url + "/confirmation?userId=" + userId + "&token=" + token;
    }

    /**
     * Retourne l'extension d'un fichier en fonction d'un type MIME
     * pour plus d'informations sur les types MIME : https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
     */
    private String mimeTypeToExtension(String mimeType) {
        return switch (mimeType) {
            case "image/jpeg" -> ".jpeg";
            case "image/png" -> ".png";
            case "image/svg" -> ".svg";
            default -> "";
        };
    }
    @GetMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public ResponseEntity<UserEntity> getUserById(@PathVariable int id) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            UserEntity userEntity = optionalUser.get();
            return ResponseEntity.ok(userEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * Permet de retrouver un hash qui pourra être utilisé comme nom de fichier
     * uniquement pour le stockage.
     * <p>
     * Le hash sera calculé à partir du nom du fichier, de son type MIME
     * (https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
     * et de la date d'upload.
     *
     * @return Le hash encodé en base64
     */
    private Optional<String> getStorageHash(MultipartFile file) {
        String hashString = null;

        if (!file.isEmpty()) {
            try {
                MessageDigest messageDigest = MessageDigest.getInstance("MD5");

                // La méthode digest de la classe "MessageDigest" prend en paramètre un byte[]
                // il faut donc transformer les différents objets utilisés pour le hachage en
                // tableau d'octets
                // Nous utiliserons la classe "ByteArrayOutputStream" pour se faire
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                outputStream.write(file.getOriginalFilename().getBytes());
                outputStream.write(file.getContentType().getBytes());
                LocalDate date = LocalDate.now();
                outputStream.write(date.toString().getBytes());

                // calcul du hash, on obtient un tableau d'octets
                byte[] hashBytes = messageDigest.digest(outputStream.toByteArray());

                // on retrouve une chaîne de caractères à partir d'un tableau d'octets
                hashString = String.format("%032x", new BigInteger(1, hashBytes));
            } catch (NoSuchAlgorithmException | IOException e) {
                logger.error(e.getMessage());
            }
        }

        return Optional.ofNullable(hashString);
    }


}
