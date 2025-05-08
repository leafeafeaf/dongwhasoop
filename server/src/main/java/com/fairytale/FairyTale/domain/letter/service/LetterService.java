package com.fairytale.FairyTale.domain.letter.service;

import com.fairytale.FairyTale.domain.letter.presentation.dto.request.CreateLetterRequest;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterListResponse;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterDetailResponse;

public interface LetterService {
    void sendLetterToCharacter(Long characterId, CreateLetterRequest request);
    LetterListResponse getLettersByBookId(Long bookId);
    LetterDetailResponse getLetterDetail(Long letterId);
}
