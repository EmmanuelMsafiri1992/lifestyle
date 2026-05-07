<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-cube';
    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Product Details')->schema([
                Select::make('store_id')
                    ->label('Store')
                    ->options(Store::pluck('name', 'id'))
                    ->required()
                    ->live()
                    ->afterStateUpdated(fn(Set $set) => $set('category_id', null)),
                Select::make('category_id')
                    ->label('Category')
                    ->options(fn(Get $get) => Category::where('store_id', $get('store_id'))->pluck('name', 'id'))
                    ->searchable(),
                TextInput::make('name')->required()->maxLength(255),
                TextInput::make('slug')->required()->maxLength(255),
                Textarea::make('short_description')->rows(2)->label('Short Description'),
                RichEditor::make('description')->columnSpanFull(),
            ])->columns(2),

            Section::make('Pricing & Stock')->schema([
                TextInput::make('price')->numeric()->prefix('R')->required(),
                TextInput::make('sale_price')->numeric()->prefix('R'),
                TextInput::make('stock')->numeric()->default(0),
                Toggle::make('track_stock')->default(true),
                TextInput::make('unit')->default('each'),
            ])->columns(3),

            Section::make('Images')->schema([
                FileUpload::make('image')->image()->directory('products')->label('Main Image'),
                FileUpload::make('gallery')->image()->multiple()->directory('products/gallery')->label('Gallery'),
            ])->columns(2),

            Section::make('Status')->schema([
                Toggle::make('is_active')->default(true),
                Toggle::make('is_featured')->default(false),
                TextInput::make('sort_order')->numeric()->default(0),
            ])->columns(3),

            Section::make('Extra Attributes')->schema([
                KeyValue::make('attributes')->label('Attributes (e.g. THC content, weight)'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\TextColumn::make('store.name')->badge()->sortable()->label('Store'),
                Tables\Columns\TextColumn::make('category.name')->label('Category'),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('price')->money('ZAR')->sortable(),
                Tables\Columns\TextColumn::make('sale_price')->money('ZAR'),
                Tables\Columns\TextColumn::make('stock')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
                Tables\Columns\IconColumn::make('is_featured')->boolean(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('store')->relationship('store', 'name'),
                Tables\Filters\SelectFilter::make('category')->relationship('category', 'name'),
                Tables\Filters\TernaryFilter::make('is_active'),
                Tables\Filters\TernaryFilter::make('is_featured'),
            ])
            ->actions([Tables\Actions\EditAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
