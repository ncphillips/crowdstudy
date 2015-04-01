# Story Time
This is an experiment run by the UPEI HCI Lab in April 2015.

We are interested in seeing how feedback effects worker performance.

During this experiment, workers will be shown a series of images. For each image, the worker will be asked to submit a 
short story about that that image. Manually analysis, as well as the `AlchemyAPI` will then be used to analyze their 
short story, and then one of three things will happen:

1. the worker will be shown **real** feedback on their performance before going to the next image
1. the worker will be shown **fake** feedback on their performance before going to the next image
1. the worker will be just be sent to the next image


## Job Life Cycle
GET / Retrives the single page application loaded with the first image.

POST /
    Sends: Null,
    Receives:
        {
            img_url: 'images/first.jpg'
        }

Client Side:
    The text box is cleared.
    The next image is loaded and displayed.
    Submit button is enabled.
    Text field is enabled.
    Current time is captured.

User:
    Looks at the image.
    Writes a story.
    Presses Submit.

Client Side:
    Submit default is prevented.
    Submit button is disabled.
    Text field is disabled.
    Current time is captured.
    Time Delta is calulated.
    
POST /
    Sends:
        {
            time: 20,
            story: 'Text the user submitted',
        }
    Receives:
        {
            img_url: 'public/next.jpg',
            metrics: {
                time: {
                    average: 200,
                    worker: 250,
                },
                word_count: {
                    average: 300,
                    worker: 400,
                }
            }
        }

Client Side:
    Metrics are displayed.
    The text box is cleared.
    The next image is loaded and displayed.
    Submit button is enabled.
    Text field is enabled.
    Current time is captured.