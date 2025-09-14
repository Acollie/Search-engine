package errorx

import "fmt"

var (
	ErrCantKeepUpWithCapacity = fmt.Errorf("can't keep up with capacity")
	ErrInvalidRequest         = fmt.Errorf("invalid request")
)
