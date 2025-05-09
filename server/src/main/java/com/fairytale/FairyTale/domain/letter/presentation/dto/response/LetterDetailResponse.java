package com.fairytale.FairyTale.domain.letter.presentation.dto.response;

import com.fairytale.FairyTale.domain.letter.domain.Letter;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LetterDetailResponse {
    private String message;
    private LetterDetailDto letter;

    public static LetterDetailResponse from(Letter letter) {
        return LetterDetailResponse.builder()
            .message("편지가 성공적으로 조회되었습니다.")
            .letter(LetterDetailDto.from(letter))
            .build();
    }

    @Getter
    @Builder
    public static class LetterDetailDto {
        private Long letter_id;
        private Long character_id;
        private String character_name;
        private String character_image_url;
        private String letter_content;
        private String audio_url;
        private Boolean is_read;
        private LocalDateTime created_at;

        public static LetterDetailDto from(Letter letter) {
            return LetterDetailDto.builder()
                .letter_id(letter.getId())
                .character_id(letter.getCharacter().getId())
                .character_name(letter.getCharacter().getName())
                .character_image_url(letter.getCharacter().getImageUrl())
                .letter_content(letter.getLetterContent())
                .audio_url(null) // 오디오 URL은 나중에 구현
                .is_read(letter.getIsRead())
                .created_at(letter.getCreatedAt())
                .build();
        }
    }

}
