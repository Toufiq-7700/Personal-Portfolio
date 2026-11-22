use web_sys::ScrollBehavior;
use web_sys::ScrollIntoViewOptions;

#[allow(dead_code)]
pub fn scroll_to_id(id: &str) {
    if let Some(window) = web_sys::window() {
        if let Some(document) = window.document() {
            if let Some(element) = document.get_element_by_id(id) {
                let options = ScrollIntoViewOptions::new();
                options.set_behavior(ScrollBehavior::Smooth);
                element.scroll_into_view_with_scroll_into_view_options(&options);
            }
        }
    }
}

pub fn scroll_to_top() {
    if let Some(window) = web_sys::window() {
        window.scroll_to_with_x_and_y(0.0, 0.0);
    }
}
