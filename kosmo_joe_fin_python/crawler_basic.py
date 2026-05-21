from html.parser import HTMLParser
from urllib.request import Request, urlopen
import csv


class SimplePageParser(HTMLParser):
    """HTML에서 title과 본문 글자를 아주 단순하게 뽑는 파서."""

    def __init__(self):
        super().__init__()
        self.in_title = False
        self.in_script_or_style = False
        self.title_parts = []
        self.text_parts = []

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self.in_title = True
        if tag in ("script", "style"):
            self.in_script_or_style = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag in ("script", "style"):
            self.in_script_or_style = False

    def handle_data(self, data):
        clean_text = " ".join(data.split())

        if not clean_text:
            return

        if self.in_title:
            self.title_parts.append(clean_text)
            return

        if not self.in_script_or_style:
            self.text_parts.append(clean_text)

    def get_title(self):
        return " ".join(self.title_parts)

    def get_preview_text(self, limit=5):
        return self.text_parts[:limit]


def fetch_html(url):
    # 일부 사이트는 User-Agent가 없으면 요청을 막기 때문에 브라우저처럼 보이게 설정한다.
    request = Request(
        url,
        headers={"User-Agent": "Mozilla/5.0"}
    )

    with urlopen(request, timeout=10) as response:
        return response.read().decode("utf-8", errors="ignore")


def save_to_csv(rows, file_name):
    with open(file_name, "w", newline="", encoding="utf-8-sig") as file:
        writer = csv.writer(file)
        writer.writerow(["type", "content"])
        writer.writerows(rows)


def main():
    target_url = "https://example.com"

    html = fetch_html(target_url)

    parser = SimplePageParser()
    parser.feed(html)

    rows = [["title", parser.get_title()]]

    for text in parser.get_preview_text():
        rows.append(["text", text])

    save_to_csv(rows, "result.csv")

    print("크롤링 완료!")
    print("저장 파일: result.csv")


if __name__ == "__main__":
    main()
