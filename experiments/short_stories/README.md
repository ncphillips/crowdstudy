# Story Time
This is an experiment run by the UPEI HCI Lab in April 2015.

We are interested in seeing how feedback effects worker performance.

During this experiment, workers will be shown a series of images. For each image, the worker will be asked to submit a 
short story about that that image. Manually analysis, as well as the `AlchemyAPI` will then be used to analyze their 
short story, and then one of three things will happen:

1. the worker will be shown **real** feedback on their performance before going to the next image
1. the worker will be shown **fake** feedback on their performance before going to the next image
1. the worker will be just be sent to the next image

## Data Fields
The `experiment` property for the worker will point to an array. 
Said array will contain objects with the following structure: 

    [{
        // Captured values
        img: 'public/name.png',
        text: 'This is a story all about how...',
        time_start: 14234151234,
        time_end: 14234158234,
        screen_resolution: "1900x1080"
        
        // Computed values.
        characters: 31,
        words: 7,
        time_elapsed: 7000
        language: "english"
        

    ]]
    
    
    


