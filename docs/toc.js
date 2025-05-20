// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded "><a href="chapters/ch01-introduction.html"><strong aria-hidden="true">1.</strong> Chapter 1: Core Rules</a></li><li class="chapter-item expanded "><a href="chapters/ch02-setting-creation.html"><strong aria-hidden="true">2.</strong> Chapter 2: Setting Creation</a></li><li class="chapter-item expanded "><a href="chapters/ch03-core-rules.html"><strong aria-hidden="true">3.</strong> Chapter 3: Character Creation</a></li><li class="chapter-item expanded "><a href="chapters/ch04-detailed-mechanics.html"><strong aria-hidden="true">4.</strong> Chapter 4: Detailed Mechanics</a></li><li class="chapter-item expanded "><a href="chapters/ch05-game-facilitator.html"><strong aria-hidden="true">5.</strong> Chapter 5: Game Facilitator</a></li><li class="chapter-item expanded "><a href="chapters/ch06-optional-rules.html"><strong aria-hidden="true">6.</strong> Chapter 6: Optional Rules</a></li><li class="chapter-item expanded "><a href="chapters/ch07.html"><strong aria-hidden="true">7.</strong> Chapter 7: Example Materials</a></li><li class="chapter-item expanded affix "><li class="part-title">Appendices</li><li class="chapter-item expanded "><a href="appendices/playtest-materials.html"><strong aria-hidden="true">8.</strong> Playtest Materials</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendices/relationship-guides.html"><strong aria-hidden="true">8.1.</strong> Relationship Guides</a></li><li class="chapter-item expanded "><a href="appendices/session-templates.html"><strong aria-hidden="true">8.2.</strong> Session Templates</a></li><li class="chapter-item expanded "><a href="appendices/gf-screens.html"><strong aria-hidden="true">8.3.</strong> GF Screens</a></li></ol></li><li class="chapter-item expanded "><a href="appendices/quickstart.html"><strong aria-hidden="true">9.</strong> Quickstart Guide</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendices/quickstart-rules.html"><strong aria-hidden="true">9.1.</strong> Quick Rules</a></li><li class="chapter-item expanded "><a href="appendices/reference-guides.html"><strong aria-hidden="true">9.2.</strong> Reference Guides</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendices/asset-guide.html"><strong aria-hidden="true">9.2.1.</strong> Asset Guide</a></li><li class="chapter-item expanded "><a href="appendices/relationship-reference.html"><strong aria-hidden="true">9.2.2.</strong> Relationship Reference</a></li><li class="chapter-item expanded "><a href="appendices/resolution-guide.html"><strong aria-hidden="true">9.2.3.</strong> Resolution Guide</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="appendices/modules.html"><strong aria-hidden="true">10.</strong> Adventure Modules</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendices/modules/shadow-court/index.html"><strong aria-hidden="true">10.1.</strong> Shadow Court</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendices/modules/shadow-court/setting.html"><strong aria-hidden="true">10.1.1.</strong> Setting</a></li><li class="chapter-item expanded "><a href="appendices/modules/shadow-court/story.html"><strong aria-hidden="true">10.1.2.</strong> Story</a></li><li class="chapter-item expanded "><a href="appendices/modules/shadow-court/characters.html"><strong aria-hidden="true">10.1.3.</strong> Characters</a></li></ol></li><li class="chapter-item expanded "><a href="appendices/modules/corporate-wars/index.html"><strong aria-hidden="true">10.2.</strong> Corporate Wars</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendices/modules/corporate-wars/setting.html"><strong aria-hidden="true">10.2.1.</strong> Setting</a></li><li class="chapter-item expanded "><a href="appendices/modules/corporate-wars/story.html"><strong aria-hidden="true">10.2.2.</strong> Story</a></li><li class="chapter-item expanded "><a href="appendices/modules/corporate-wars/characters.html"><strong aria-hidden="true">10.2.3.</strong> Characters</a></li></ol></li><li class="chapter-item expanded "><a href="appendices/modules/frontier-clans/index.html"><strong aria-hidden="true">10.3.</strong> Frontier Clans</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendices/modules/frontier-clans/setting.html"><strong aria-hidden="true">10.3.1.</strong> Setting</a></li><li class="chapter-item expanded "><a href="appendices/modules/frontier-clans/story.html"><strong aria-hidden="true">10.3.2.</strong> Story</a></li><li class="chapter-item expanded "><a href="appendices/modules/frontier-clans/characters.html"><strong aria-hidden="true">10.3.3.</strong> Characters</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
