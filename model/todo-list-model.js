const { readFileParse, writeFile } = require("../util/file-system");
class List {
  constructor(content) {
    this.content = content;
  }

  static async fetchAll() {
    const listsData = await readFileParse();
    return listsData;
  }

  async post() {
    const listsData = await readFileParse();
    listsData.push(this.content);
    await writeFile(listsData);
    return listsData;
  }

  async delete() {
    const listsData = await readFileParse();
    const newData = listsData.filter((listData, index) => {
      return index !== this.content.index;
    });
    await writeFile(newData);
    return newData;
  }

  async update() {
    const listsData = await readFileParse();
    listsData.map((listData, index) => {
      if (index === this.content.index) {
        return (listsData[index].name = this.content.name);
      }
    });
    await writeFile(listsData);
  }
}

module.exports = List;
