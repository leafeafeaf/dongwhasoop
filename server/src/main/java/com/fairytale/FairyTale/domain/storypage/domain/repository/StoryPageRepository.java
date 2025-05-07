package com.fairytale.FairyTale.domain.storypage.domain.repository;

import com.fairytale.FairyTale.domain.book.presentation.dto.response.StoryPageWithAudioResponse;
import com.fairytale.FairyTale.domain.storypage.domain.StoryPage;
import com.fairytale.FairyTale.domain.storypage.domain.StoryPageId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoryPageRepository extends JpaRepository<StoryPage, StoryPageId> {

    @Query("""
            SELECT new com.fairytale.FairyTale.domain.book.presentation.dto.response.StoryPageWithAudioResponse(
                sp.id.pageNumber,
                sp.textContent,
                sp.imageUrl,
                pa.audioUrl
            )
            FROM StoryPage sp
            LEFT JOIN sp.pageAudioList pa ON pa.userVoice.id = :voiceId
            WHERE sp.book.id = :bookId
            ORDER BY sp.id.pageNumber
        """)
    List<StoryPageWithAudioResponse> findPagesWithVoiceAudio(Long bookId, Long voiceId);
}
