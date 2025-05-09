package com.fairytale.FairyTale.domain.letter.presentation.dto.response;

import com.fairytale.FairyTale.domain.letter.domain.Letter;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LetterListResponse {

    private String message;
    private List<LetterDto> letters;

    public static LetterListResponse from(List<Letter> letters) {
        List<LetterDto> letterDtoList = letters.stream()
            .map(LetterDto::from)
            .toList();

        return LetterListResponse.builder()
            .message("편지의 리스트가 성공적으로 조회되었습니다.")
            .letters(letterDtoList)
            .build();
    }

    @Getter
    @Builder
    public static class LetterDto {
        private Long letter_id;
        private Long character_id;
        private String character_name;
        private String character_image_url;
        private Boolean is_read;
        private LocalDateTime created_at;

        public static LetterDto from(Letter letter) {
            return LetterDto.builder()
                .letter_id(letter.getId())
                .character_id(letter.getCharacter().getId())
                .character_name(letter.getCharacter().getName())
                .character_image_url(letter.getCharacter().getImageUrl())
                .is_read(letter.getIsRead())
                .created_at(letter.getCreatedAt())
                .build();
        }
    }
}
