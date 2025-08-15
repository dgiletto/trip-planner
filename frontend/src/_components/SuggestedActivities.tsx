"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Mountain, 
  Camera, 
  Utensils, 
  Moon,
  Sun,
  Sunset,
  TreePine,
  Waves,
  Bike,
  Eye,
  Music,
  Star,
} from 'lucide-react';

// Type definitions
interface SuggestedActivity {
  name: string;
  category: string;
  description: string;
  bestTime: string;
}

interface ActivityData {
  suggestedActivities: SuggestedActivity[];
}

interface ActivityCardProps {
  activity: SuggestedActivity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'outdoor':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'sightseeing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'food':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nightlife':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string): React.ReactNode => {
    switch (category.toLowerCase()) {
      case 'outdoor':
        return <Mountain className="w-4 h-4" />;
      case 'sightseeing':
        return <Camera className="w-4 h-4" />;
      case 'food':
        return <Utensils className="w-4 h-4" />;
      case 'nightlife':
        return <Moon className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getTimeIcon = (bestTime: string): React.ReactNode => {
    switch (bestTime.toLowerCase()) {
      case 'morning':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'afternoon':
        return <Sun className="w-4 h-4 text-orange-500" />;
      case 'evening':
        return <Sunset className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTimeColor = (bestTime: string): string => {
    switch (bestTime.toLowerCase()) {
      case 'morning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'afternoon':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'evening':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getActivitySpecificIcon = (name: string, description: string): React.ReactNode => {
    const nameAndDesc = (name + ' ' + description).toLowerCase();
    
    if (nameAndDesc.includes('bike') || nameAndDesc.includes('cycle')) {
      return <Bike className="w-5 h-5 text-blue-600" />;
    }
    if (nameAndDesc.includes('swim') || nameAndDesc.includes('beach') || nameAndDesc.includes('water')) {
      return <Waves className="w-5 h-5 text-blue-600" />;
    }
    if (nameAndDesc.includes('hike') || nameAndDesc.includes('climb')) {
      return <Mountain className="w-5 h-5 text-blue-600" />;
    }
    if (nameAndDesc.includes('walk') || nameAndDesc.includes('stroll')) {
      return <TreePine className="w-5 h-5 text-blue-600" />;
    }
    if (nameAndDesc.includes('food') || nameAndDesc.includes('eat') || nameAndDesc.includes('pizza')) {
      return <Utensils className="w-5 h-5 text-blue-600" />;
    }
    if (nameAndDesc.includes('view') || nameAndDesc.includes('sunset') || nameAndDesc.includes('panoramic')) {
      return <Eye className="w-5 h-5 text-blue-600" />;
    }
    if (nameAndDesc.includes('night') || nameAndDesc.includes('busker') || nameAndDesc.includes('music')) {
      return <Music className="w-5 h-5 text-blue-600" />;
    }
    
    return getCategoryIcon(activity.category);
  };

  const extractLocation = (name: string): string => {
    const match = name.match(/\(([^)]+)\)$/);
    return match ? match[1] : '';
  };

  const getCleanName = (name: string): string => {
    return name.replace(/\s*\([^)]*\)$/, '');
  };

  const location = extractLocation(activity.name);
  const cleanName = getCleanName(activity.name);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getActivitySpecificIcon(activity.name, activity.description)}
              <CardTitle className="text-lg text-blue-600">
                {cleanName}
              </CardTitle>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className={getCategoryColor(activity.category)}>
                {getCategoryIcon(activity.category)}
                <span className="ml-1">{activity.category}</span>
              </Badge>
              <Badge variant="outline" className={getTimeColor(activity.bestTime)}>
                {getTimeIcon(activity.bestTime)}
                <span className="ml-1">Best: {activity.bestTime}</span>
              </Badge>
            </div>

            {location && (
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{location}</span>
              </div>
            )}

          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-primary text-sm leading-relaxed mb-4">
          {activity.description}
        </p>
      </CardContent>
    </Card>
  );
};

// Grid layout for activities
const ActivityGrid: React.FC<{ activities: SuggestedActivity[] }> = ({ activities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} />
      ))}
    </div>
  );
};

// Category filter component
const CategoryFilter: React.FC<{
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, selectedCategory, onCategoryChange }) => {
  const getCategoryIcon = (category: string): React.ReactNode => {
    switch (category.toLowerCase()) {
      case 'outdoor':
        return <Mountain className="w-4 h-4" />;
      case 'sightseeing':
        return <Camera className="w-4 h-4" />;
      case 'food':
        return <Utensils className="w-4 h-4" />;
      case 'nightlife':
        return <Moon className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('all')}
        className="mb-2 cursor-pointer"
      >
        All Activities
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="mb-2 cursor-pointer"
        >
          {getCategoryIcon(category)}
          <span className="ml-1">{category}</span>
        </Button>
      ))}
    </div>
  );
};

// Main component
const ActivitySuggestions: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  // Sample data - can be replaced with any activities dataset
  const activityData: ActivityData = {
    suggestedActivities: [
      {
        name: "Appian Way Bike Ride (Rome)",
        category: "Outdoor",
        description: "Cycle ancient basalt roads past ruins, catacombs exteriors, and aqueducts. Start at Porta San Sebastiano; traffic is light once you're on the park trails.",
        bestTime: "Morning"
      },
      {
        name: "Self-Guided Fountains & Squares Walk (Rome)",
        category: "Sightseeing",
        description: "Trevi, Pantheon, and Piazza Navona loop using public water fountains (nasone) to stay cool and save money.",
        bestTime: "Afternoon"
      },
      {
        name: "Pompeii on a Budget",
        category: "Sightseeing",
        description: "Take the Circumvesuviana to Pompeii Scavi; focus on the Forum, House of the Faun, amphitheater, and Garden of the Fugitives. Bring a hat; shade is limited.",
        bestTime: "Morning"
      },
      {
        name: "Vesuvius Crater Rim Hike",
        category: "Outdoor",
        description: "Short, steep cinder path to the crater viewpoints. Wear sturdy shoes and carry extra water in August.",
        bestTime: "Morning"
      },
      {
        name: "Sorrento Cliff Swim",
        category: "Outdoor",
        description: "Use public beach access near Marina Grande for a refreshing swim without beach club fees.",
        bestTime: "Afternoon"
      },
      {
        name: "Path of the Gods (Agerola → Nocelle)",
        category: "Outdoor",
        description: "Iconic coastal ridge hike with sweeping Amalfi views; finish by descending steps to Positano. Start early and carry at least 2L of water per person.",
        bestTime: "Morning"
      },
      {
        name: "Florence Hills Sunset",
        category: "Sightseeing",
        description: "Climb to Piazzale Michelangelo and San Miniato for golden-hour views over Florence's dome and rooftops.",
        bestTime: "Evening"
      },
      {
        name: "Lucca Wall Ride",
        category: "Outdoor",
        description: "Rent a bike and circle Lucca's tree-lined Renaissance walls; flat, shaded, and inexpensive.",
        bestTime: "Afternoon"
      },
      {
        name: "Street Food Sampling (Naples & Florence)",
        category: "Food",
        description: "Budget eats like pizza al taglio, cuoppo fritto, schiacciata, and gelato. Great for quick refuels between activities.",
        bestTime: "Evening"
      },
      {
        name: "Tiber & Arno Night Walks",
        category: "Nightlife",
        description: "Free riverside promenades with buskers and pop-up stalls; lively atmosphere without cover charges.",
        bestTime: "Evening"
      }
    ]
  };

  const categories = Array.from(new Set(activityData.suggestedActivities.map(a => a.category)));
  
  const filteredActivities = selectedCategory === 'all' 
    ? activityData.suggestedActivities 
    : activityData.suggestedActivities.filter(a => a.category === selectedCategory);

  const getCategoryStats = () => {
    const stats = categories.map(category => ({
      category,
      count: activityData.suggestedActivities.filter(a => a.category === category).length
    }));
    return stats;
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Suggested Activities</h1>
          <p className="text-primary mb-4">
            Discover amazing experiences in London • {activityData.suggestedActivities.length} activities available
          </p>
          
          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-4">
            {getCategoryStats().map(stat => (
              <div key={stat.category} className="text-sm text-primary">
                <span className="font-medium">{stat.count}</span> {stat.category}
              </div>
            ))}
          </div>
        </div>
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="mb-4">
          <p className="text-sm text-primary">
            Showing {filteredActivities.length} {selectedCategory === 'all' ? 'activities' : `${selectedCategory.toLowerCase()} activities`}
          </p>
        </div>
        
        <ActivityGrid activities={filteredActivities} />
      </div>
    </div>
  );
};

export default ActivitySuggestions;