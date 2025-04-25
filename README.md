# Instagram 2.0 Mobile App

## Prerequisites

- Node.js (v18 or later)
- npm or Yarn
- Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/instagram-2.0.git
   cd instagram-2.0
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Development

### Running the App

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will launch the Expo development server. You can then:
- Scan the QR code with the Expo Go app on your mobile device
- Press `i` to open iOS simulator
- Press `a` to open Android emulator

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build:web`: Build the web version of the app
- `npm run lint`: Run linter to check code quality

## Building for Production

### Web
```bash
npm run build:web
```

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Project Structure

- `app/`: Main application screens and routing
- `components/`: Reusable React Native components
- `constants/`: Theme and configuration files
- `hooks/`: Custom React hooks
- `src/`: Additional source files

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- Lucide Icons

## Troubleshooting

- Ensure you have the latest version of Node.js and Expo CLI
- Clear Metro bundler cache: `expo start -c`
- Check Expo documentation for platform-specific setup

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
