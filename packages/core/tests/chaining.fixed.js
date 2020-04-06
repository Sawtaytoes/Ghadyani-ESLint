let foo = Function.prototype

foo()

;[
	1,
	2,
	3,
]
.forEach(
	Object
	.keys(
		foo.prototype
	)
	.length
)
