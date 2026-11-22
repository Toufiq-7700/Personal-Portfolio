use leptos::prelude::*;

const WORDS: &[&str] = &[
    "Problem Solver",
    "Builder",
    "Programmer",
    "Creator",
    "Developer",
    "AI/ML Enthusiast",
];

pub fn use_typewriter() -> ReadSignal<String> {
    let (text, set_text) = signal(String::new());

    let word_idx = std::rc::Rc::new(std::cell::Cell::new(0usize));
    let char_idx = std::rc::Rc::new(std::cell::Cell::new(0usize));
    let is_deleting = std::rc::Rc::new(std::cell::Cell::new(false));

    fn schedule_next(
        set_text: WriteSignal<String>,
        word_idx: std::rc::Rc<std::cell::Cell<usize>>,
        char_idx: std::rc::Rc<std::cell::Cell<usize>>,
        is_deleting: std::rc::Rc<std::cell::Cell<bool>>,
        delay_ms: u32,
    ) {
        gloo_timers::callback::Timeout::new(delay_ms, move || {
            let current_word = WORDS[word_idx.get()];
            let cur_char = char_idx.get();
            let deleting = is_deleting.get();

            let next_delay = if deleting {
                if cur_char > 0 {
                    let next_char = cur_char - 1;
                    char_idx.set(next_char);
                    set_text.set(current_word[..next_char].to_string());
                    45
                } else {
                    is_deleting.set(false);
                    let next_word = (word_idx.get() + 1) % WORDS.len();
                    word_idx.set(next_word);
                    400
                }
            } else if cur_char < current_word.len() {
                let next_char = cur_char + 1;
                char_idx.set(next_char);
                set_text.set(current_word[..next_char].to_string());
                if next_char == current_word.len() {
                    is_deleting.set(true);
                    2200
                } else {
                    85
                }
            } else {
                is_deleting.set(true);
                1000
            };

            schedule_next(set_text, word_idx, char_idx, is_deleting, next_delay);
        })
        .forget();
    }

    schedule_next(set_text, word_idx, char_idx, is_deleting, 800);

    text
}
