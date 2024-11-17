import { useSpring, animated } from '@react-spring/web'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

// Remove the interface and define props in the function parameter directly
export function FeatureCard({ title, description, isHovered, onHover, onLeave }) {
  const spring = useSpring({
    scale: isHovered ? 1.05 : 1,
    boxShadow: isHovered ? '0 10px 30px -5px rgba(255,255,255,0.3)' : '0 0 0 0 rgba(255,255,255,0)',
  })

  return (
    <animated.div
      style={spring}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="h-full"
    >
      <Card className="h-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="font-serif">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </CardContent>
      </Card>
    </animated.div>
  )
}
