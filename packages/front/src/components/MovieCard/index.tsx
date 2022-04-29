import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import IconStar from '@mui/icons-material/Star'

interface Props {
  imageSrc: string
  title: string
  rating: string
}

export default function MovieCard({ imageSrc, title, rating }: Props) {
  return (
    <Card
      sx={{
        maxWidth: 245,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        height={300}
        image={imageSrc}
        alt="movie cover"
        sx={{ backgroundColor: '#eaeaea' }}
      />
      <CardContent>
        <Typography fontSize="1.2rem" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <IconStar fontSize="small" color="primary" />
        {rating}
      </CardContent>
      <CardActions>
        <Button size="small">Add to my library</Button>
      </CardActions>
    </Card>
  )
}
