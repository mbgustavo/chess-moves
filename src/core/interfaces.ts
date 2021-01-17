// Numeric indexes for piece position
export interface NumericPosition {
  x: number,
  y: number
}

export interface Piece {
  // possible dx and dy for the piece in one move
  possibleMoves: NumericPosition[],
  // indicates if the piece can perform the possible moves multiples times (typically used for queens, bishops...)
  multipleMoves: boolean,
  // the fields below are necessary only if pawns are considered
  strictMoves?: boolean, // indicates if the piece must move strictly in the moves provided, without changing signs
  duplicateFirstMove?: boolean // possible first move of the piece (pawns can move 2 times then)
  attackMoves?: NumericPosition[], // possible moves only if there is an enemy there
}