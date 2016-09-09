AnnotationTypes = new Mongo.Collection("AnnotationTypes");


//name:String
//favorPoints:Integer
//againstPoints:Integer
//sport:Sports
AnnotationTypes.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});
