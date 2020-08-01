// Numeric indexes for piece position
interface NumericPostion {
  x: number,
  y: number
}

const charCodeAtA = 'A'.charCodeAt(0); // Char code at uppercase A, first valid column

export class PositionsController {
  /** Get possible next positions for the piece received */
  public getNextPositions(piece: string, position: string): string[] {
    const pos = this.validateConvertPosition(position)
    if (!pos) return ['invalid']

    return [this.convertToChessNotation(pos)];
  }

  /** Validate if position received has the correct format and is within the table and returns it in numeric indexes.
   * Returns nothing if invalid. */
  private validateConvertPosition(position: string): NumericPostion | void {
    if (position.length !== 2) return;

    const [column, row]: string[] = position.split('')
    const x = column.charCodeAt(0) - charCodeAtA;
    const y = Number(row) - 1;

    if (!this.isWithinTable({ x, y })) return;

    return { x, y };
  }

  /** Returns a boolean verifying if coordinates are inside the table */
  private isWithinTable(pos: NumericPostion): boolean {
    const tableSize = 8;

    return pos.x >= 0 && pos.x < tableSize &&
      pos.y >= 0 && pos.y < tableSize;
  }

  /** Returns chess notation converted from numeric indexes */
  private convertToChessNotation(pos: NumericPostion): string {
    const x = String.fromCharCode(pos.x + charCodeAtA);
    const y = String(pos.y + 1);
    return x + y;
  }
}