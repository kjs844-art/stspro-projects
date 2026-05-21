package com.joe.fin.home;

// 🧑‍🏫 Teacher Note: These "import" statements are like tools in a toolbox.
// We are bringing in the 'Controller' and 'GetMapping' tools from the Spring Framework
// so that our Java class can talk to the internet.
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 🧑‍🏫 What is a @Controller?
 * In the MVC (Model-View-Controller) design pattern, this class is the "Controller".
 * Think of it as a traffic cop. When a user types "localhost:8080/" in their browser,
 * Spring Boot sends that request here.
 * 
 * The @Controller annotation tells Spring: "Please scan this class and look for URL mappings!"
 */
@Controller
public class HomeController {
	
	/**
	 * 🧑‍🏫 What is @GetMapping?
	 * This annotation "maps" a specific URL path to a Java method.
	 * The "/" means the root path (the homepage).
	 * 
	 * How it works:
	 * 1. User visits "/"
	 * 2. Spring runs the home() method below.
	 * 3. The method returns the name of the file to show the user.
	 */
	@GetMapping("/")
	public String home() {
		// 🧑‍🏫 Why return "index"?
		// This is the "View" part of MVC.
		// Spring looks for a file named "index.jsp" or "index.html" 
		// inside your webapp folders and sends it to the user.
		return "index";
	}

	@GetMapping("/terminal")
	public String terminal() {
		return "terminal";
	}

}
