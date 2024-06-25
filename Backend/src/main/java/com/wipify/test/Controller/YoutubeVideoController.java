package com.wipify.test.Controller;

import com.wipify.test.model.Article;
import com.wipify.test.model.YoutubeVideo;
import com.wipify.test.repository.YoutubeVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;


@RestController
public class YoutubeVideoController {
    @Autowired
    private YoutubeVideoRepository youtubeVideoRepository;

    @PostMapping(value = "/youtubevideo", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin
    public YoutubeVideo addYoutubeVideo(@RequestBody YoutubeVideo youtubeVideo) {
        youtubeVideo.setDate(new Date());
        return youtubeVideoRepository.save(youtubeVideo);
    }

    @GetMapping(value = "/youtubeVideo")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public Iterable<YoutubeVideo> getYoutubeVideoUrl(){
        return youtubeVideoRepository.findAll();
    }

    @DeleteMapping("/youtubeVideo/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @CrossOrigin
    public ResponseEntity<Void> deleteVideoGame(@PathVariable int id) {
        // Recherche de l'article à supprimer
        Optional<YoutubeVideo> optionalVideoYt = youtubeVideoRepository.findById(id);
        if (optionalVideoYt.isPresent()) {
            // Si l'article existe, on le supprime
            youtubeVideoRepository.delete(optionalVideoYt.get());
            // Retourne une réponse avec le statut 204 No Content pour indiquer que la suppression a été effectuée avec succès
            return ResponseEntity.noContent().build();
        } else {
            // Si l'article avec l'ID spécifié n'est pas trouvé, retourne une réponse 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }
}
