package com.photography.cms.controller;

import com.photography.cms.entity.MembershipTier;
import com.photography.cms.service.MembershipTierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membership")
@RequiredArgsConstructor
public class MembershipController {

    private final MembershipTierService membershipTierService;

    @GetMapping
    public List<MembershipTier> getAll() {
        return membershipTierService.getAll();
    }

    @GetMapping("/{id}")
    public MembershipTier getById(@PathVariable Long id) {
        return membershipTierService.getById(id);
    }

    @PostMapping
    public ResponseEntity<MembershipTier> create(@RequestBody MembershipTier tier) {
        return ResponseEntity.ok(membershipTierService.save(tier));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembershipTier> update(@PathVariable Long id, @RequestBody MembershipTier updated) {
        MembershipTier tier = membershipTierService.getById(id);
        tier.setName(updated.getName());
        tier.setPrice(updated.getPrice());
        tier.setFeatures(updated.getFeatures());
        return ResponseEntity.ok(membershipTierService.save(tier));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        membershipTierService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
