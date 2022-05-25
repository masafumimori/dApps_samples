import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { NftType } from '../types';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const NFTCard = ({ metadata, token_id }: NftType) => {
	if (!metadata) return null;

	const meta = JSON.parse(metadata);

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				component="img"
				height="194"
				image={meta.image}
				alt={`${meta.name}'s image`}
			/>
			<CardContent>
				<Typography variant="h5" color="text.secondary">
					{meta.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{meta.description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<Stack marginLeft={'auto'}>
					<Button variant={'contained'}>
						<Link
							to={'/mint'}
							state={{ token_id }}
							style={{ textDecoration: 'none', color: '#fff' }}
						>
							Mint
						</Link>
					</Button>
				</Stack>
			</CardActions>
		</Card>
	);
};

export default NFTCard;
