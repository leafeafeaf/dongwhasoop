package com.fairytale.FairyTale.global.config.handler;

import com.fairytale.FairyTale.global.security.JwtTokenProvider;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@RequiredArgsConstructor
public class TtsWebSocketHandler extends TextWebSocketHandler {

    // 유저 ID WebSocket 세션에 저장하는 맵
    private final Map<Long, WebSocketSession> sessionMap = new ConcurrentHashMap<>();
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Long userId = extractUserId(session); // 쿼리 파라미터로 userId 받는다고 가정
        sessionMap.put(userId, session);
        log.debug("WebSocket connected: {}", userId);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
        throws Exception {
        Long userId = extractUserId(session);
        sessionMap.remove(userId);
        log.debug("WebSocket disconnected: {}", userId);
    }

    //TODO 카프카로부터 메시지를 받으면 데이터 주는 함수

    //쿼리 파라미터로부터 값을 빼내는 역할
    //TODO 예외 메시지 처리
    private Long extractUserId(WebSocketSession session) throws IOException {
        try {
            String token = extractQueryParam(session, "token");
            return Long.valueOf(jwtTokenProvider.getJws(token).getBody().getSubject());
        } catch (Exception e) {
            session.close(CloseStatus.NOT_ACCEPTABLE.withReason("JWT 인증 실패"));
            throw new IllegalArgumentException("WebSocket 인증 실패", e);
        }
    }

    //url 쿼리 파라미터에서 특정 키에 해당하는 값을 가져오는 함수
    private String extractQueryParam(WebSocketSession session, String key) {
        return UriComponentsBuilder.fromUri(session.getUri())
            .build()
            .getQueryParams()
            .getFirst(key);
    }

    //웹소켓에 연결되어있는 유저인지 확인하는 함수
    public boolean isUserConnected(Long userId) {
        WebSocketSession session = sessionMap.get(userId);
        return session != null && session.isOpen();
    }
}