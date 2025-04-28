package com.fairytale.FairyTale.domain.child.service;

import com.fairytale.FairyTale.domain.child.domain.Child;
import com.fairytale.FairyTale.domain.child.domain.Repository.ChildRepository;
import com.fairytale.FairyTale.domain.child.presentation.dto.request.RegisterNewChildRequest;
import com.fairytale.FairyTale.domain.child.presentation.dto.response.ChildrenResponse;
import com.fairytale.FairyTale.domain.user.domain.User;
import com.fairytale.FairyTale.domain.user.domain.repository.UserRepository;
import com.fairytale.FairyTale.global.exception.UserNotFoundException;
import com.fairytale.FairyTale.global.util.user.UserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildServiceImpl implements ChildService{

    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final UserUtils userUtils;

    @Override
    public ChildrenResponse getChildList() {

        // 1. 사용자 검증
        User currentUser = validateUser();

        // 2. 현재 사용자의 자녀 목록 조회
        List<Child> children = childRepository.findByUser(currentUser);

        // 3. DTO에 정의한 정적 팩토리 메서드를 사용하여 변환 후 반환
        return ChildrenResponse.from(children);

    }

    @Override
    @Transactional
    public void registerNewChild(RegisterNewChildRequest request) {

        // 1. 사용자 검증
        User currentUser = validateUser();

        // 2. 새로운 자녀 프로필 등록
        Child child = Child.builder()
                .name(request.getName())
                .user(currentUser)
                .mascotId(request.getMascotId())
                .build();
        childRepository.save(child);

    }

    private User validateUser() {
        User currentUser = userUtils.getUserFromSecurityContext();
        Long userId = currentUser.getId();
        userRepository.findById(userId).orElseThrow(() -> UserNotFoundException.EXCEPTION);

        return currentUser;
    }
}
