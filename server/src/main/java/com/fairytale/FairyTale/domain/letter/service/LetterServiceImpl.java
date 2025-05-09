package com.fairytale.FairyTale.domain.letter.service;

import com.fairytale.FairyTale.domain.character.domain.Character;
import com.fairytale.FairyTale.domain.character.domain.repository.CharacterRepository;
import com.fairytale.FairyTale.domain.child.domain.Child;
import com.fairytale.FairyTale.domain.child.domain.Repository.ChildRepository;
import com.fairytale.FairyTale.domain.child.exception.ChildNotFoundException;
import com.fairytale.FairyTale.domain.letter.domain.Letter;
import com.fairytale.FairyTale.domain.letter.domain.repository.LetterRepository;
import com.fairytale.FairyTale.domain.letter.exception.LetterNotFoundException;
import com.fairytale.FairyTale.domain.letter.presentation.dto.request.CreateLetterRequest;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterDetailResponse;
import com.fairytale.FairyTale.domain.letter.presentation.dto.response.LetterListResponse;
import com.fairytale.FairyTale.domain.letterbox.domain.LetterBox;
import com.fairytale.FairyTale.domain.letterbox.domain.LetterBoxId;
import com.fairytale.FairyTale.domain.letterbox.domain.repository.LetterBoxRepository;
import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;
import com.fairytale.FairyTale.global.exception.UnauthorizedException;
import com.fairytale.FairyTale.global.util.user.UserUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;
    private final CharacterRepository characterRepository;
    private final ChildRepository childRepository;
    private final LetterBoxRepository letterBoxRepository;
    private final UserUtils userUtils;

    @Override
    @Transactional
    public void sendLetterToCharacter(Long characterId, CreateLetterRequest request) {
        // 현재 로그인한 사용자 확인
        User currentUser = userUtils.getUserFromSecurityContext();

        // 캐릭터 정보 조회
        Character character = characterRepository.findById(characterId)
            .orElseThrow(() -> new FairyTaleException(ErrorCode.CHARACTER_NOT_FOUND));

        // 자녀 정보 조회
        Child child = childRepository.findById(request.getChildId())
            .orElseThrow(() -> ChildNotFoundException.EXCEPTION);

        // 자녀가 현재 사용자의 자녀인지 확인
        if (!child.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("접근 권한이 없습니다.");
        }

        // 책 정보 조회 (캐릭터가 속한 책)
        Long bookId = character.getBook().getId();

        // 레터박스 조회 (없으면 생성)
        LetterBoxId letterBoxId = new LetterBoxId(child.getId(), bookId);
        LetterBox letterBox = letterBoxRepository.findById(letterBoxId)
            .orElse(LetterBox.builder()
                .child(child)
                .book(character.getBook())
                .build());

        letterBoxRepository.save(letterBox);

        // 편지 생성 및 저장
        Letter letter = Letter.builder()
            .letterBox(letterBox)
            .letterContent(request.getContent())
            .isRead(false)
            .character(character)
            .build();

        letterRepository.save(letter);
    }


    @Override
    @Transactional(readOnly = true)
    public LetterListResponse getLettersByBookId(Long bookId) {
        // 현재 로그인한 사용자 정보 가져오기
        User currentUser = userUtils.getUserFromSecurityContext();

        // 해당 책에 대한 현재 사용자의 모든 자녀들의 편지 목록 조회
        List<Letter> letters = letterRepository.findLettersByBookIdAndUserId(bookId,
            currentUser.getId());

        return LetterListResponse.from(letters);
    }

    @Override
    @Transactional
    public LetterDetailResponse getLetterDetail(Long letterId) {
        // 편지 정보 조회
        Letter letter = letterRepository.findById(letterId)
            .orElseThrow(() -> new LetterNotFoundException("존재하지 않는 편지입니다."));

        // 현재 로그인한 사용자 정보 가져오기
        User currentUser = userUtils.getUserFromSecurityContext();

        // 편지가 현재 사용자의 자녀에게 속한 것인지 확인
        if (!letter.getLetterBox().getChild().getUser().getId().equals(currentUser.getId())) {
            throw UnauthorizedException.EXCEPTION;
        }

        // 편지를 읽음 상태로 변경
        if (!letter.getIsRead()) {
            letter.setIsRead(true);
        }

        return LetterDetailResponse.from(letter);
    }

}
