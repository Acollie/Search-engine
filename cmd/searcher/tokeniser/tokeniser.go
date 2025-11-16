package tokeniser

func Tokenise(text string) []string {
	words := []string{}
	currentWord := ""
	for _, char := range text {
		if char == ' ' || char == '\n' || char == '\t' || char == '.' || char == ',' || char == '!' || char == '?' {
			if currentWord != "" {
				words = append(words, currentWord)
			}
			currentWord = ""
		} else {
			currentWord += string(char)
		}
	}
	if currentWord != "" {
		words = append(words, currentWord)
	}
	return words
}
