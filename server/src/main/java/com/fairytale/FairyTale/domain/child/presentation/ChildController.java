package com.fairytale.FairyTale.domain.child.presentation;

import com.fairytale.FairyTale.domain.child.presentation.dto.response.ChildrenResponse;
import com.fairytale.FairyTale.domain.child.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/children")
public class ChildController {

    private final ChildService childService;

    @GetMapping
    public ChildrenResponse getChildList() {
        return childService.getChildList();
    }
}
