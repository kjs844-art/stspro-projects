package com.joe.fin.watchlist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/watchlist")
public class WatchlistController {
	private final WatchlistService watchlistService;

	public WatchlistController(WatchlistService watchlistService) {
		this.watchlistService = watchlistService;
	}

	@GetMapping
	public String list(Model model) {
		model.addAttribute("watchlist", watchlistService.list());
		model.addAttribute("item", new WatchlistDTO());
		return "watchlist/list";
	}

	@PostMapping
	public String save(WatchlistDTO watchlist,
	                   @RequestParam(required = false) String redirectTo) {
		watchlistService.save(watchlist);
		return "redirect:" + safeRedirect(redirectTo);
	}

	@PostMapping("/delete")
	public String delete(@RequestParam Integer watchlistId) {
		watchlistService.delete(watchlistId);
		return "redirect:/watchlist";
	}

	private String safeRedirect(String redirectTo) {
		if (redirectTo != null && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
			return redirectTo;
		}
		return "/watchlist";
	}
}
