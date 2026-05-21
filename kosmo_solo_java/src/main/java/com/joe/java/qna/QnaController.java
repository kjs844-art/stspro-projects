package com.joe.java.qna;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.util.List;

/*
 * ============================================================
 * QnaController - Handles /qna/* and /board/* URLs
 * 
 * /qna/* -> Full CRUD backed by the qna table in DB
 * /board/* -> Simple view pages (static for now)
 * ============================================================
 */
@Controller
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;

    // ============ QnA CRUD (DB-backed) ============

    /*
     * GET /qna/list - Show all QnA articles
     */
    @GetMapping("/qna/list")
    public String list(Model model) {
        List<QnaDTO> qnaList = qnaService.selectQnaList();
        model.addAttribute("qnaList", qnaList);
        return "qna/list";
    }

    /*
     * GET /qna/detail/{qnaId} - Show one QnA article
     */
    @GetMapping("/qna/detail/{qnaId}")
    public String detail(@PathVariable Long qnaId, Model model) {
        qnaService.updateHit(qnaId);
        QnaDTO qna = qnaService.selectQnaById(qnaId);
        model.addAttribute("qna", qna);
        return "qna/detail";
    }

    /*
     * GET /qna/add - Show the add form
     */
    @GetMapping("/qna/add")
    public String addForm() {
        return "qna/add";
    }

    /*
     * POST /qna/add - Save a new QnA article
     */
    @PostMapping("/qna/add")
    public String add(@ModelAttribute QnaDTO qna, RedirectAttributes redirectAttributes) {
        qnaService.insertQna(qna);
        redirectAttributes.addFlashAttribute("message", "QnA added successfully!");
        return "redirect:/qna/list";
    }

    /*
     * GET /qna/update/{qnaId} - Show the edit form
     */
    @GetMapping("/qna/update/{qnaId}")
    public String updateForm(@PathVariable Long qnaId, Model model) {
        QnaDTO qna = qnaService.selectQnaById(qnaId);
        model.addAttribute("qna", qna);
        return "qna/update";
    }

    /*
     * POST /qna/update - Update an existing QnA article
     */
    @PostMapping("/qna/update")
    public String update(@ModelAttribute QnaDTO qna, RedirectAttributes redirectAttributes) {
        qnaService.updateQna(qna);
        redirectAttributes.addFlashAttribute("message", "QnA updated successfully!");
        return "redirect:/qna/list";
    }

    /*
     * POST /qna/delete/{qnaId} - Delete a QnA article
     */
    @PostMapping("/qna/delete/{qnaId}")
    public String delete(@PathVariable Long qnaId, RedirectAttributes redirectAttributes) {
        qnaService.deleteQna(qnaId);
        redirectAttributes.addFlashAttribute("message", "QnA deleted successfully!");
        return "redirect:/qna/list";
    }

    // ============ Board (static view pages) ============

    @GetMapping("/board/add")
    public String boardAdd() {
        return "board/add";
    }

    @GetMapping("/board/detail")
    public String boardDetail() {
        return "board/detail";
    }
}
