package com.joe.fin.member;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private final JdbcTemplate jdbcTemplate;

    public MemberService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public MemberDTO register(String email, String displayName, String password) {
        jdbcTemplate.update("""
                insert into members (email, display_name, membership_type, password_hash)
                values (?, ?, 'FREE', ?)
                """, email, displayName, hash(password));
        return findByEmail(email).orElseThrow();
    }

    public Optional<MemberDTO> login(String email, String password) {
        try {
            MemberDTO member = jdbcTemplate.queryForObject("""
                    select member_id, email, display_name, membership_type
                    from members
                    where email = ? and password_hash = ?
                    """, (rs, rowNum) -> new MemberDTO(
                    rs.getInt("member_id"),
                    rs.getString("email"),
                    rs.getString("display_name"),
                    rs.getString("membership_type")), email, hash(password));
            return Optional.ofNullable(member);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public List<MemberDTO> findAll() {
        return jdbcTemplate.query("""
                select member_id, email, display_name, membership_type
                from members
                order by member_id desc
                """, (rs, rowNum) -> new MemberDTO(
                rs.getInt("member_id"),
                rs.getString("email"),
                rs.getString("display_name"),
                rs.getString("membership_type")));
    }

    public Optional<MemberDTO> findByEmail(String email) {
        try {
            MemberDTO member = jdbcTemplate.queryForObject("""
                    select member_id, email, display_name, membership_type
                    from members
                    where email = ?
                    """, (rs, rowNum) -> new MemberDTO(
                    rs.getInt("member_id"),
                    rs.getString("email"),
                    rs.getString("display_name"),
                    rs.getString("membership_type")), email);
            return Optional.ofNullable(member);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    private String hash(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(bytes);
        } catch (Exception e) {
            throw new IllegalStateException("Password hashing failed", e);
        }
    }
}
