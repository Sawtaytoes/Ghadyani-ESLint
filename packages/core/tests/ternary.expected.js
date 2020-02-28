const func = Function()
const blah = ''

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

const items = (
	includeStaged
	? [
		...collection.resource.staged.create,
		...collection.items,
	]
	: collection.items
)

items
