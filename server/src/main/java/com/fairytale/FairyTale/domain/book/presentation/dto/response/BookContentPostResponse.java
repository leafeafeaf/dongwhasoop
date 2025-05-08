package com.fairytale.FairyTale.domain.book.presentation.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookContentPostResponse {

    private String message;
    private boolean completed;
    private List<StoryPageWithAudioResponse> pages;
}
