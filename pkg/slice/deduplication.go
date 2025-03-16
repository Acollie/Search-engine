package slice

func DeDuplicate[T comparable](input []T) []T {
	seenMap := map[T]bool{}
	var returnArray []T

	for _, item := range input {
		_, ok := seenMap[item]
		if ok {
			continue
		}
		seenMap[item] = true
		returnArray = append(returnArray, item)
	}

	return returnArray
}
