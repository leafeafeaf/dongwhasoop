package com.fairytale.FairyTale.domain.letter.presentation;

import com.fairytale.FairyTale.domain.letter.presentation.dto.request.CreateLetterRequest;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterDetailResponse;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterListResponse;
import com.fairytale.FairyTale.domain.letter.service.LetterService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/letters")
public class LetterController {

    private final LetterService letterService;

    @PostMapping("/{characterId}")
    public void sendLetterToCharacter(
        @PathVariable Long characterId,
        @RequestBody CreateLetterRequest request) {

        letterService.sendLetterToCharacter(characterId, request);
    }

    @GetMapping("/{bookId}")
    public LetterListResponse getLettersByBookId(@PathVariable Long bookId) {
        return letterService.getLettersByBookId(bookId);
    }

    @GetMapping("/detail/{letterId}")
    public LetterDetailResponse getLetterDetail(@PathVariable Long letterId) {
        return letterService.getLetterDetail(letterId);
    }



}
