package com.joe.book.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.joe.book.model.D1P2_BookDTO;
import com.joe.book.service.D3P3_BookService;
import lombok.RequiredArgsConstructor;

// 🚪 이 클래스는 사용자가 책(Book)과 관련된 주소로 들어왔을 때 가장 먼저 반겨주는 입구(Controller)입니다.
@Controller
@RequestMapping("/book") // 모든 요청 주소 앞에 "/book"이 붙습니다. (예: /book/list)
@RequiredArgsConstructor // 서비스(D3P3_BookService)를 자동으로 가져오기 위한 생성자를 만듭니다.
public class D5P1_BookController {

    private final D3P3_BookService bookService;

    // =====================================================
    // 📋 1. 도서 목록 보기 (READ) - GET /book/list
    // =====================================================
    @GetMapping("/list")
    public String list(Model model) throws Exception {
        // model: 택배 상자입니다. 여기에 데이터를 담아서 JSP(화면)로 보냅니다.
        // bookService.selectAll(): DB에서 모든 책 목록을 가져오라고 시킵니다.
        model.addAttribute("books", bookService.selectAll());
        
        // WEB-INF/views/book/D6P0_list.jsp 파일을 화면에 보여줍니다.
        return "book/D6P0_list";
    }

    // =====================================================
    // ➕ 2. 도서 등록 화면 (CREATE 폼) - GET /book/insertForm
    // =====================================================
    @GetMapping("/insertForm")
    public String insertForm() throws Exception {
        // 입력 폼 화면인 D6P0_insertForm.jsp를 보여줍니다.
        return "book/D6P0_insertForm";
    }

    // =====================================================
    // ➕ 3. 실제 도서 저장 (CREATE 처리) - POST /book/insert
    // =====================================================
    @PostMapping("/insert")
    public String insert(D1P2_BookDTO bookDTO) throws Exception {
        // 사용자가 폼에 입력한 데이터가 bookDTO에 자동으로 담겨서 옵니다.
        bookService.insert(bookDTO);
        
        // 저장이 끝났으니 다시 목록(/book/list)으로 화면을 이동시킵니다.
        return "redirect:/book/list";
    }

    // =====================================================
    // ✏️ 4. 도서 수정 화면 (UPDATE 폼) - GET /book/updateForm?id=번호
    // =====================================================
    @GetMapping("/updateForm")
    public String updateForm(@RequestParam("id") int id, Model model) throws Exception {
        // @RequestParam("id"): 주소창의 ?id=번호 에서 번호를 읽어옵니다.
        // 수정할 책 1권의 기존 정보를 DB에서 가져와서 택배 상자(model)에 담습니다.
        model.addAttribute("book", bookService.selectOne(id));
        
        // 수정 폼 화면인 D6P0_updateForm.jsp를 보여줍니다.
        return "book/D6P0_updateForm";
    }

    // =====================================================
    // ✏️ 5. 실제 도서 수정 (UPDATE 처리) - POST /book/update
    // =====================================================
    @PostMapping("/update")
    public String update(D1P2_BookDTO bookDTO) throws Exception {
        // 수정한 데이터를 담은 bookDTO를 넘겨서 DB를 업데이트합니다.
        bookService.update(bookDTO);
        
        // 수정 후 목록으로 이동!
        return "redirect:/book/list";
    }

    // =====================================================
    // 🗑️ 6. 도서 삭제 (DELETE) - GET /book/delete?id=번호
    // =====================================================
    @GetMapping("/delete")
    public String delete(@RequestParam("id") int id) throws Exception {
        // 해당 아이디(id)의 책을 DB에서 삭제합니다.
        bookService.delete(id);
        
        // 삭제 후 목록으로 이동!
        return "redirect:/book/list";
    }
}

