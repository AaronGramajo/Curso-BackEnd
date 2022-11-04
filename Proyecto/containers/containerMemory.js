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
        const newItem = {id: `${Date.now()}`, ...item}
        this.array.push(newItem)
        return newItem
    }

    update(id, updatedItem) {
        const ind = this.array.findIndex((prod) => prod.id === id)
        this.array[ind] = updatedItem
    }

    delete(id) {
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