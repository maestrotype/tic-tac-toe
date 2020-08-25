function haveEmptyCell(matrix: Array<Array<string>>, rowsNum: number, colsNum: number): boolean {
    let empty: boolean = false;
    for (let x = 0; x < rowsNum; x++) {
        for (let y = 0; y < colsNum; y++) {
            const element: any = matrix[x][y];
            if (!element) {
                empty = true;
                break;
            }
        }
        if (empty)
            break;
    }
    return empty;
}

export default haveEmptyCell