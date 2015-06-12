//
//  ViewController.m
//  AlgorithmiaExample1
//
//  Created by Richard Sprague on 3/9/15.
//  Copyright (c) 2015 Richard Sprague. All rights reserved.
//

#import "ViewController.h"

@interface ViewController()
@property (weak, nonatomic) IBOutlet UITextField *userInputTextField;
@property (weak, nonatomic) IBOutlet UILabel *AGResultsTextLabel;
@end

@implementation ViewController

- (IBAction)didPressPrime:(id)sender {
    [self sendInputToAlgorithmia:self.userInputTextField.text];
}

- (void) sendInputToAlgorithmia:(NSString *)input {
    
    // Setup URI and API Key
    NSString * const algorithmUrl = @"https://api.algorithmia.com/v1/algo/diego/isPrime";
    NSString * const apiKey = @"<API_KEY>";
    
    // Build HTTP request
    NSURL *url  = [NSURL URLWithString:algorithmUrl];
    NSString *postData = [[NSString alloc] initWithString:input];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[url standardizedURL]];
    
    // IMPORTANT: make sure you set the right Content-Type and Authorization headers
    [request setHTTPMethod:@"POST"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setValue:apiKey forHTTPHeaderField: @"Authorization"];
    [request setHTTPBody:[postData dataUsingEncoding:NSUTF8StringEncoding]];
    
    NSURLSession *session = [NSURLSession sharedSession];
    
    // Fireup the data task
    NSURLSessionDataTask * dataTask = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if ([(NSHTTPURLResponse*)response statusCode] == 200)
        {
            NSLog(@"Raw result: %@\n", [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding]);
            
            NSDictionary * json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
            
            if ([[json valueForKey:@"result"] isKindOfClass:[NSNumber class]])
            {
                int result = [[json objectForKey:@"result"] intValue];
                
                dispatch_sync(dispatch_get_main_queue(), ^{
                    self.AGResultsTextLabel.text = (result == 1) ? @"Yes, it's prime" : @"No, not prime";
                });
            }
        }
        else
        {
            NSLog(@"NSURLSession error response code = %ld",(long)[(NSHTTPURLResponse*)response statusCode]);
        }
    }];
    
    self.AGResultsTextLabel.text = @"Waiting...";
    
    [dataTask resume];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
