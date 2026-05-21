package com.joe.java.notice;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.util.List;

/*
 * ============================================================
 * NoticeController - Handles HTTP requests for /notice/*
 * 
 * @Controller: tells Spring this class handles web requests
 * @RequestMapping("/notice"): all paths start with /notice
 * @RequiredArgsConstructor: injects NoticeService via constructor
 * 
 * Flow: Browser -> HTTP request -> Controller -> Service -> Mapper -> DB
 *       Browser <- JSP view  <- Controller <- Service <- Mapper <- DB
 * ============================================================
 */
@Controller
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    /*
     * GET /notice/list - Show all notices
     * Model: a container to send data from Controller to JSP
     * model.addAttribute("key", value) -> JSP reads it with ${key}
     */
    @GetMapping("/list")
    public String list(Model model) {
        List<NoticeDTO> noticeList = noticeService.selectNoticeList();
        model.addAttribute("noticeList", noticeList);
        return "notice/list";  // -> /WEB-INF/views/notice/list.jsp
    }

    /*
     * GET /notice/detail/{noticeId} - Show one notice
     * @PathVariable: extracts {noticeId} from the URL path
     * updateHit: increments the view count first
     */
    @GetMapping("/detail/{noticeId}")
    public String detail(@PathVariable Long noticeId, Model model) {
        noticeService.updateHit(noticeId);  // +1 view count
        NoticeDTO notice = noticeService.selectNoticeById(noticeId);
        model.addAttribute("notice", notice);
        return "notice/detail";
    }

    /*
     * GET /notice/add - Show the form to create a notice
     */
    @GetMapping("/add")
    public String addForm() {
        return "notice/add";
    }

    /*
     * POST /notice/add - Submit the form, save to DB
     * @ModelAttribute: Spring fills NoticeDTO fields from form data
     *   (form input names must match DTO field names)
     * RedirectAttributes: passes a flash message (shows once then disappears)
     * redirect:/notice/list: after save, redirect browser to list page
     */
    @PostMapping("/add")
    public String add(@ModelAttribute NoticeDTO notice, RedirectAttributes redirectAttributes) {
        noticeService.insertNotice(notice);
        redirectAttributes.addFlashAttribute("message", "Notice added successfully!");
        return "redirect:/notice/list";
    }

    /*
     * GET /notice/update/{noticeId} - Show the edit form
     * Pre-fills the form with existing data from the DB
     */
    @GetMapping("/update/{noticeId}")
    public String updateForm(@PathVariable Long noticeId, Model model) {
        NoticeDTO notice = noticeService.selectNoticeById(noticeId);
        model.addAttribute("notice", notice);
        return "notice/update";
    }

    /*
     * POST /notice/update - Submit edit, update in DB
     */
    @PostMapping("/update")
    public String update(@ModelAttribute NoticeDTO notice, RedirectAttributes redirectAttributes) {
        noticeService.updateNotice(notice);
        redirectAttributes.addFlashAttribute("message", "Notice updated successfully!");
        return "redirect:/notice/list";
    }

    /*
     * POST /notice/delete/{noticeId} - Delete a notice
     */
    @PostMapping("/delete/{noticeId}")
    public String delete(@PathVariable Long noticeId, RedirectAttributes redirectAttributes) {
        noticeService.deleteNotice(noticeId);
        redirectAttributes.addFlashAttribute("message", "Notice deleted successfully!");
        return "redirect:/notice/list";
    }
}
