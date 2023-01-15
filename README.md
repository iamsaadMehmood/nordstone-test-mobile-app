# nordstone-test-mobile-app
Brief explanation:
It will have a total of just 6 screens:
1. Splash screen
2. Sign up screen
3. Notification screen (1st tab)
4. Photo screen (2nd tab)
5. Text screen (3rd tab)
6. Calculator screen (4th tab)

Further explanation:
1. Splash screen – should render upon launch
2. Auth: Email / Password (with "forgot password?" option) (check for temporary and
invalid emails along with valid and strong password combinations)
(Use Tab Navigation for the next four screens)
3. 1st tab: There will be a big red button on the screen. Upon press, it will send a
notification to yourself on the same device.
4. 2nd tab: On this screen, you can upload photo to Firestore and view the uploaded photo
in the frontend. You can also upload and replace the photo using both camera and
gallery.
5. 3rd tab: On this screen, you will be able to write text, send it and save to Firestore, and it
will be fetched and rendered in the frontend onsnapshot.
6. 4th tab: On this screen, you will create a simple calculator. You will have two number
inputs and a drop down of three operators: addition, subtraction and multiplication.
When you click “Calculate”, you will post the chosen operation to a simple API deployed
to Heroku, and the API will respond with the chosen operation performed on the two
numbers. E.g. user inputs 3 and 7 and chooses multiply, clicks send, then 3, 7 and
“multiply” are posted to the API, and it responds with 21.
