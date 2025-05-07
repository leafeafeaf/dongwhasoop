package com.fairytale.FairyTale.domain.book.service;

import com.fairytale.FairyTale.domain.book.domain.repository.BookRepository;
import com.fairytale.FairyTale.domain.book.exception.NotFoundBookException;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookContentPostResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.BookListResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.SongResponse;
import com.fairytale.FairyTale.domain.book.presentation.dto.response.StoryPageWithAudioResponse;
import com.fairytale.FairyTale.domain.storypage.domain.repository.StoryPageRepository;
import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.domain.uservoice.domain.respository.UserVoiceRepository;
import com.fairytale.FairyTale.global.config.handler.TtsWebSocketHandler;
import com.fairytale.FairyTale.global.error.exception.ErrorCode;
import com.fairytale.FairyTale.global.error.exception.FairyTaleException;
import com.fairytale.FairyTale.global.util.user.UserUtils;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final UserUtils userUtils;
    private final TtsWebSocketHandler ttsWebSocketHandler;
    private final StoryPageRepository storyPageRepository;
    private final UserVoiceRepository userVoiceRepository;

    @Override
    public Slice<BookListResponse> getBookList(PageRequest pageRequest) {
        return bookRepository.findAllBooks(pageRequest).map(BookListResponse::from);
    }

    @Override
    public SongResponse getSong(Long bookId) {
        return SongResponse.from(bookRepository.findById(bookId)
            .orElseThrow(() -> NotFoundBookException.EXCEPTION));
    }

    @Override
    public BookContentPostResponse getBookContentIfExists(Long bookId, Long voiceId) {
        //유저 정보 가져오기
        User user = userUtils.getUserFromSecurityContext();
        Long userId = user.getId();

        //웹소캣 연결 여부 확인
        if (!ttsWebSocketHandler.isUserConnected(userId)) {
            throw new FairyTaleException(ErrorCode.WEBSOCKET_NOT_CONNECTED);
        }

        //bookId, voiceId 검증
        if (!bookRepository.existsById(bookId)) {
            throw new FairyTaleException(ErrorCode.BOOK_NOT_FOUND);
        }
        if (!userVoiceRepository.existsByIdAndUserId(voiceId, userId)) {
            throw new FairyTaleException(ErrorCode.USER_VOICE_NOT_FOUND);
        }

        //이미 생성된 데이터가 있는지 확인
        List<StoryPageWithAudioResponse> pages = storyPageRepository.findPagesWithVoiceAudio(bookId,
            voiceId);

        //생성이 안된 페이지 확인
        boolean allPagesHaveAudio = pages.stream().allMatch(p -> p.getAudioUrl() != null);

        if (!allPagesHaveAudio) {
            //TODO kafka로 명령 보내기
            return BookContentPostResponse.builder()
                .message("TTS를 통해 음성을 생성 중 입니다.")
                .completed(false)
                .pages(null)
                .build();
        } else {
            return BookContentPostResponse.builder()
                .message("기존 TTS가 존재하여 바로 응답합니다.")
                .completed(true)
                .pages(pages)
                .build();
        }
    }

}
