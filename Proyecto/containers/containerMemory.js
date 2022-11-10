class ContainerMemory {
    constructor(array) {
        this.array = array
    }

    getAll() {
        return this.array
    }

    getById(id) {
        return this.array.find((prod) => prod.id === id) || {error: 'item not found'}
    }

    save(item) {
        let newId
        if (this.array.length == 0) {
            newId = 1
        } else {
            newId = this.array[this.array.length - 1].id + 1
        }
        const newItem = {id: newId, ...item}
        this.array.push(newItem)
        return newItem
    }

    update(id, updatedItem) {
        const ind = this.array.findIndex((prod) => prod.id === id)
        this.array[ind] = updatedItem
    }

    deleteById(id) {
        const ind = this.array.findIndex((prod) => prod.id === id)
        if (ind === -1) {
            return { error: 'item not found' };
        }
        this.array.splice(ind, 1);
        return {msg: 'item deleted'};
    }

    deleteAll() {
        this.array = []
    }
}

module.exports = ContainerMemory