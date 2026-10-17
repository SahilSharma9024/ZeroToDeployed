import { ExerciseItem } from '../types/fitness';

export const EXERCISE_DATABASE: ExerciseItem[] = [
  {
    id: 'ex_1',
    title: 'Barbell Back Squat',
    category: 'Legs',
    difficulty: 'Intermediate',
    targetMuscles: ['Quadriceps', 'Glutes', 'Adductors'],
    secondaryMuscles: ['Hamstrings', 'Erector Spinae', 'Core'],
    equipment: 'Barbell & Squat Rack',
    steps: [
      'Position the barbell across your upper traps (high bar) or rear deltoids (low bar).',
      'Step back, plant feet slightly wider than shoulder-width with toes angled 15-30 degrees outward.',
      'Brace your core using diaphragmatic breathing (Valsalva maneuver).',
      'Break simultaneously at hips and knees, sitting back and down while keeping chest proud.',
      'Descend until thighs break parallel with the ground, then drive the floor away through your mid-foot.'
    ],
    commonMistakes: [
      'Knees caving inward (valgus collapse) on the ascent.',
      'Allowing heels to lift off the ground.',
      'Rounding the lower back (butt wink) at the bottom of the movement.'
    ],
    youtubeVideoId: 'bEv6CCg2BC8', // Form video
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex_2',
    title: 'Incline Dumbbell Chest Press',
    category: 'Chest',
    difficulty: 'Beginner',
    targetMuscles: ['Clavicular Head (Upper Chest)', 'Anterior Deltoids'],
    secondaryMuscles: ['Triceps Brachii'],
    equipment: 'Incline Bench (30-45 deg) & Dumbbells',
    steps: [
      'Set an adjustable bench to an incline angle between 30 and 45 degrees.',
      'Sit back with dumbbells resting on thighs, then kick dumbbells up as you lie back.',
      'Retract your scapula (pull shoulder blades together) and arch slightly in upper thoracic spine.',
      'Lower weights under control with elbows at roughly a 45-degree angle from torso.',
      'Press upward in a slight arc until weights are above upper chest, squeezing pecs at the top.'
    ],
    commonMistakes: [
      'Setting bench too high (>45 degrees) which turns it into a shoulder press.',
      'Flaring elbows out at 90 degrees putting excessive torque on the rotator cuff.',
      'Bouncing the weights at bottom.'
    ],
    youtubeVideoId: '8iPEnn-ltC8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex_3',
    title: 'Conventional Barbell Deadlift',
    category: 'Back',
    difficulty: 'Advanced',
    targetMuscles: ['Erector Spinae', 'Gluteus Maximus', 'Hamstrings'],
    secondaryMuscles: ['Trapezius', 'Latissimus Dorsi', 'Forearms / Grip'],
    equipment: 'Olympic Barbell & Bumper Plates',
    steps: [
      'Step up to the bar so it is over your mid-foot (about 1 inch from shins).',
      'Hinge at the hips and grip the barbell just outside your knees with double-overhand or mixed grip.',
      'Bring shins forward until they touch the bar, pull chest up, and pull the slack out of the barbell.',
      'Take a deep belly breath and brace. Drive through the floor, extending hips and knees simultaneously.',
      'Lock out at the top by squeezing glutes without hyper-extending the lower back.'
    ],
    commonMistakes: [
      'Jerking the bar off the floor without taking out the slack.',
      'Rounding the lumbar spine.',
      'Letting the bar drift forward away from the body.'
    ],
    youtubeVideoId: 'op9kVnSso6Q',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex_4',
    title: 'Dumbbell Romanian Deadlift (RDL)',
    category: 'Legs',
    difficulty: 'Intermediate',
    targetMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Lower Back', 'Core'],
    equipment: 'Pair of Dumbbells',
    steps: [
      'Stand with feet hip-width apart holding dumbbells in front of thighs.',
      'Soft bend in knees, keep shoulders pinned back and chest open.',
      'Push your hips backward as if trying to touch the wall behind you.',
      'Lower dumbbells along shins until you feel a deep stretch in the hamstrings (around mid-shin).',
      'Drive hips forward to return to standing position.'
    ],
    commonMistakes: [
      'Squatting down rather than hip hinging.',
      'Looking up straining the neck (keep neck neutral with spine).',
      'Letting the dumbbells drift far away from legs.'
    ],
    youtubeVideoId: 'JCXUYuzwNrM',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex_5',
    title: 'Overhead Standing Dumbbell Shoulder Press',
    category: 'Shoulders',
    difficulty: 'Intermediate',
    targetMuscles: ['Anterior & Lateral Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Traps', 'Core Stabilizers'],
    equipment: 'Dumbbells',
    steps: [
      'Stand tall with feet shoulder-width apart, glutes squeezed and abs braced tight.',
      'Bring dumbbells to shoulder level with elbows slightly angled forward in the scapular plane.',
      'Press both dumbbells overhead in a smooth path until arms are locked out.',
      'Lower dumbbells back to shoulder height with complete control.'
    ],
    commonMistakes: [
      'Excessive backward arching in the lower back.',
      'Flaring elbows straight out to the sides.',
      'Using leg drive (which turns it into a push press).'
    ],
    youtubeVideoId: 'qEwKCR5JCog',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex_6',
    title: 'Wide-Grip Lat Pulldown',
    category: 'Back',
    difficulty: 'Beginner',
    targetMuscles: ['Latissimus Dorsi', 'Teres Major'],
    secondaryMuscles: ['Biceps Brachii', 'Brachialis', 'Lower Traps'],
    equipment: 'Cable Lat Pulldown Machine',
    steps: [
      'Adjust thigh pads so your legs are locked securely underneath.',
      'Grasp the bar with a wide overhand grip, sit down and lean back slightly (10-15 degrees).',
      'Initiate the movement by depressing your shoulder blades downward.',
      'Pull the bar down toward upper chest by leading with your elbows.',
      'Slowly resist the weight on the way back up to full stretch.'
    ],
    commonMistakes: [
      'Pulling the bar behind the neck (dangerous for rotator cuffs).',
      'Swinging torso violently using momentum.',
      'Not getting full extension and stretch at the top.'
    ],
    youtubeVideoId: 'CAwf7n6Luuc',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex_7',
    title: 'Hanging Knee / Leg Raises',
    category: 'Core',
    difficulty: 'Intermediate',
    targetMuscles: ['Rectus Abdominis', 'Iliopsoas (Hip Flexors)'],
    secondaryMuscles: ['Obliques', 'Forearm Grip'],
    equipment: 'Pull-up Bar',
    steps: [
      'Hang from a pull-up bar with an overhand grip, shoulders engaged.',
      'Avoid swinging: brace your core before beginning.',
      'Flex hips and curl pelvis upward, bringing knees towards chest (or legs straight for advanced).',
      'Pause for a second at the top contraction, then slowly lower back down.'
    ],
    commonMistakes: [
      'Using swinging pendulum momentum.',
      'Only lifting thighs without curling pelvis (neglecting lower abs).'
    ],
    youtubeVideoId: 'hdng3Nm1x_E',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'ex_8',
    title: 'Incline Dumbbell Bicep Curl',
    category: 'Arms',
    difficulty: 'Beginner',
    targetMuscles: ['Biceps Brachii (Long Head)'],
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    equipment: 'Incline Bench (45-60 deg) & Dumbbells',
    steps: [
      'Sit on an incline bench with back flat against the pad and arms hanging straight down.',
      'Keep upper arms stationary and perpendicular to the floor.',
      'Curl dumbbells upward while supinating wrists (palms facing up).',
      'Squeeze biceps at the top, then lower slowly feeling the deep stretch in long head.'
    ],
    commonMistakes: [
      'Bringing elbows forward off the vertical line.',
      'Swinging the shoulders.'
    ],
    youtubeVideoId: 'soxrZlIl35U',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600'
  }
];

