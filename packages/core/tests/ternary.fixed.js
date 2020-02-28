const func = Function()
const blah = ''

const test2 = (
	func || func()
		? 'fun'
		: (
			func
				? 'kevin'
				: 'something else'
		)
)

test2

const test = (
	func()
		? (
			blah
				? 'phil'
				: 'kevin'
		)
		: 'jacob'
)

test

const includeStaged = ''
const collection = ''
let items

items = includeStaged
	? [
		...collection.resource.staged.create,
		...collection.items,
	]
	: collection.items

items = includeStaged
	? (
		() => (
			null
		)
	)
	: collection.items

items
