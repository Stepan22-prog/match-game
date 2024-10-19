import { Button } from '@mui/material'
import matchIcon from '../../assets/free-icon-match.png'

type MatchButtonType = {
  numberOfMatches: number;
  disabled: boolean;
  onClick: (numberOfMatches: number) => void;
}

export default function MatchButton({ numberOfMatches, disabled, onClick }: MatchButtonType) {
  return (
    <Button disabled={disabled} variant="contained" onClick={() => onClick(numberOfMatches)}>
      <img
        src={matchIcon}
        alt="Match"
        width={20}
        height={20}
      />
      {numberOfMatches}
    </Button>
  )
}
