import { Box } from "@mui/material";

type TakenNumberType = {
  number: number | null;
  type: 'computer' | 'player';
};

export default function TakenNumber({ number, type } : TakenNumberType) {
  return (
    <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: type === 'computer' ? 'error.main' : 'success.main',
          color: 'white',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          margin: '0 auto',
          opacity: number ? '1': '0',
          transition: '0.3s'
        }}
      >
        {number}
      </Box>
  )
}
