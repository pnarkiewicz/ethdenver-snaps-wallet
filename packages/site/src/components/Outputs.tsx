import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import styledd from 'styled-components';

// Define the styles for the text component
const Text = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  marginBottom: '10px',
  marginTop: '10px',
}));

// Define the type for the props
type Props = {
  text: string;
};

// Define the component
export const TextComponent: React.FC<Props> = ({ text }) => {
  return <Text variant="body1">{text}</Text>;
};

import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

interface Props1 {
  items: string[];
  itemsPerPage?: number;
}

const Title = styledd.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 15px 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const useStyles = {
  myStack: {
    border: '2px solid black',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    '& > *': {
      margin: '10px 0',
    },
  },
  ButtonRight: {
    marginLeft: '60px',
  },
  ButtonLeft: {
    marginRight: '60px',
  },
  Paginator: {
    marginBottom: '20px',
  }
};


// Define the component
export const PaginatedListComponent = ({ items, itemsPerPage = 10 }: Props1) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const classes = useStyles;

  return (
    <>
      <Title>
        List of accounts satisfying your needs!
      </Title>
      <Stack spacing={2} sx={classes.myStack}>
        {currentItems.map((item, index) => (
          <Box key={index}>
            <Typography>{item}</Typography>
          </Box>
        ))}
      </Stack>
      <Box mt={2}>
        <Button variant="outlined" onClick={handlePrevPage} disabled={currentPage === 1} sx={classes.ButtonLeft}>
          Prev
        </Button>
        <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages} sx={classes.ButtonRight}>
          Next
        </Button>
      </Box>
      <Typography variant="caption" mt={2} sx={classes.Paginator}>
        Page {currentPage} of {totalPages}
      </Typography>
    </>
  );
};

// export default PaginatedListComponent;

